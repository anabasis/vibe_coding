# **To-Do List PRD (Next.js + LocalStorage, 단일 페이지)**

---

## **0) 범위 & 비범위**

- **범위**
  - 단일 페이지에서 To-Do **CRUD**
  - **완료 여부 필터링** (All / Active / Completed)
  - **텍스트 검색** (제목 기반, 부분 일치, 대소문자 무시)
  - LocalStorage **영속화**
- **비범위 (이번 버전 제외)**
  - 사용자 계정/동기화(서버 통신)
  - 태그/마감일/우선순위/정렬 커스터마이즈/서브태스크/드래그앤드롭 정렬
  - Import/Export
  - 멀티 페이지 라우팅
  - 알림/푸시/캘린더 연동

---

## **1) 사용자 스토리 (개발 관점)**

- 사용자는 입력창에 할 일을 적고 **Enter** 또는 **추가 버튼**으로 To-Do를 생성한다.
- 리스트에서 각 항목의 체크박스로 **완료/미완료** 상태를 전환한다.
- 항목의 **텍스트를 인라인 편집**할 수 있다(더블클릭 또는 편집 버튼).
- 항목을 **삭제**할 수 있다.
- 상단의 탭(또는 토글)으로 **All / Active / Completed**를 선택해 필터링한다.
- 상단 검색창에 키워드를 입력하면 **현재 필터와 AND 조건**으로 검색 결과가 즉시 반영된다.
- 새로고침해도 데이터가 **LocalStorage**에 남아 있다.

---

## **2) 기능 요구사항 (상세)**

### **2.1 생성(Create)**

- 입력값 trim() 후 빈 문자열이면 생성하지 않음.
- 중복 제목 허용
- 생성 시 필드:
  - id (UUID v4 또는 nanoid)
  - title (입력값)
  - completed = false
  - createdAt = Date.now()
  - updatedAt = Date.now()

### **2.2 읽기(Read) & 정렬**

- 기본 정렬: **createdAt 내림차순**(최신 항목이 위).
- 화면 로드 시 LocalStorage에서 상태를 복원.

### **2.3 수정(Update)**

- 항목 더블클릭 또는 편집 버튼 → 인라인 편집 모드.
- **Enter** 저장, **Esc** 취소, 포커스 아웃 시 저장.
- 저장 시 updatedAt 갱신. 빈 문자열이면 **수정 취소**(원복).

### **2.4 완료 토글(Toggle)**

- 체크박스 클릭 → completed 토글, updatedAt 갱신.
- 선택적 대량 작업: **Clear Completed** 버튼(있으면 편리, 권장).

### **2.5 삭제(Delete)**

- 개별 항목 삭제 버튼.
- 편집 중 삭제 시 확인 모달 생략.

### **2.6 필터(Filter)**

- 옵션: **All / Active / Completed** (단일 선택).
- 필터는 **클라이언트 상태**로만 관리(쿼리스트링 사용하지 않음).
- 필터 변경 시 리스트 즉시 반영.

### **2.7 검색(Search)**

- **부분 일치, 대소문자 무시** (title.toLowerCase().includes(q.toLowerCase()))
- 150ms **디바운스**.
- 현재 필터 결과에 **AND**로 적용.
- 빈 검색어일 때 검색 미적용.

### **2.8 영속화(Persistence)**

- LocalStorage **키**: todo-app:v1
- 저장 구조는 **단일 JSON 객체**(버전 포함)로 직렬화
  ```
  {
    "version": 1,
    "todos": [
      { "id": "…", "title": "예시", "completed": false, "createdAt": 1736123456789, "updatedAt": 1736123456789 }
    ]
  }
  ```
- 파싱 실패/데이터 없음 → **초기 상태**로 시작.
- 쓰기 빈도 제어: 상태 변경 후 **250ms 쓰로틀**로 LocalStorage 반영.

### **2.9 접근성/키보드**

- 입력 필드와 버튼에 **label**/accessible name 제공.
- 체크박스는 네이티브 <input type="checkbox">.
- 편집 모드 진입 시 **포커스 이동**.
- 목록 항목은 키보드로 **탭 순환** 가능.

### **2.10 에러/엣지 케이스**

- **LocalStorage 사용 불가**(SSR, 프라이빗 모드 제한, 예외) 시:
  - 안전 가드: typeof window !== 'undefined' 체크 + try/catch
  - **메모리 폴백**으로 동작(새로고침 시 유실 안내 배지).
- **저장 용량 초과(QuotaExceededError)** 시:
  - 사용자에게 간단한 토스트 또는 배지로 알림.
  - 기능은 동작하되 영속화 실패 안내.

---

## **3) 상태 모델 & 저장 스키마**

### **3.1 타입 정의**

```
type TodoId = string;

interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  createdAt: number;   // epoch ms
  updatedAt: number;   // epoch ms
}

interface AppStateV1 {
  version: 1;
  todos: Todo[];
}
```

### **3.2 파생 상태**

- filteredTodos = byFilter(todos, filter)
- searchedTodos = bySearch(filteredTodos, query)
- itemsLeft = todos.filter(t => !t.completed).length

---

## **4) 컴포넌트 구조(단일 페이지)**

```
/ (TodoPage)
 ├─ Header
 │   ├─ NewTodoInput (입력 + 추가 버튼)
 │   └─ Controls
 │       ├─ FilterTabs  (All/Active/Completed)
 │       └─ SearchInput (디바운스)
 ├─ TodoList
 │   ├─ TodoItem[] (체크박스, 타이틀, 편집, 삭제)
 │   └─ EmptyState (검색/필터 결과 없을 때)
 └─ Footer (itemsLeft, [Clear Completed])
```

### **각 컴포넌트 계약(요약)**

- **NewTodoInput**
  - props: { onAdd(title: string) }
  - 엔터/버튼으로 생성, 빈 문자열 방지
- **FilterTabs**
  - props: { value: 'all'|'active'|'completed', onChange(v) }
- **SearchInput**
  - props: { value: string, onChangeDebounced(q) } (150ms)
- **TodoList**
  - props: { items: Todo[], onToggle(id), onEdit(id,title), onDelete(id) }
- **TodoItem**
  - 인라인 편집(더블클릭 또는 Edit)

---

## **5) 훅/유틸 설계**

### **5.1 LocalStorage 유틸**

```
const STORAGE_KEY = 'todo-app:v1';

function loadState(): AppStateV1 | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1 || !Array.isArray(parsed?.todos)) return null;
    return parsed as AppStateV1;
  } catch { return null; }
}

function saveStateThrottled(state: AppStateV1) {
  // 250ms 쓰로틀 (간단 구현; 모듈 스코프 타이머 변수 사용)
}
```

### **5.2**

### **useTodos**

### **훅**

- 내부에 useState + useEffect로 LocalStorage 로드/저장
- 노출 API:
  ```
  const {
    todos, addTodo, toggleTodo, editTodo, deleteTodo,
    clearCompleted, itemsLeft
  } = useTodos();
  ```
- **성능**: 변경 시마다 즉시 상태 업데이트, 저장은 **쓰로틀링**.

---

## **6) 상호작용 플로우 (요약)**

- **추가**
  1. 입력 → 유효성 통과 → addTodo() → 상태 업데이트 → 저장 쓰로틀 큐
- **토글**
  1. 체크박스 클릭 → toggleTodo() → 상태 업데이트 → 저장 쓰로틀 큐
- **편집**
  1. 더블클릭 → 입력모드 → Enter 저장 / Esc 취소
- **삭제**
  1. 삭제 클릭 → deleteTodo() → 저장
- **필터/검색**
  1. UI 변경 → 파생 목록 재계산(메모이제이션 선택) → 렌더

---

## **7) 수용 기준 (Acceptance Criteria)**

- 빈 제목은 생성/저장되지 않는다.
- 리스트는 createdAt 내림차순으로 표시된다.
- **All/Active/Completed** 필터가 의도대로 동작한다.
- 검색은 부분 일치, 대소문자 무시, 필터와 **AND**로 동작한다.
- 편집 모드에서 Enter 저장, Esc 취소, 블러 시 저장된다(빈 문자열 저장 불가).
- 완료 토글, 편집, 삭제 시 updatedAt이 갱신된다.
- 새로고침 후에도 기존 데이터가 남아 있다(LocalStorage 정상 작동 시).
- LocalStorage 사용 불가 상황에서도 기본 동작은 가능하고(메모리 폴백), 사용자에게 비영속 안내가 보인다.
- Clear Completed 클릭 시 완료 항목이 모두 제거된다(선택 구현 시).

---

## **8) 접근성 & 반응형**

- 폼 컨트롤에 label/aria-label 제공.
- 키보드만으로 생성/편집/삭제/필터/검색 수행 가능.
- 모바일(≤ 375px)에서도 입력/리스트/컨트롤이 한 화면에 자연스럽게 배치.

---

## **9) 테스트 체크리스트**

- 단위: addTodo / editTodo / toggleTodo / deleteTodo / clearCompleted 의 순수 로직.
- E2E: 생성→편집→토글→검색/필터→삭제 시나리오.
- 복구: 저장된 스냅샷을 지우고 초기화되는지.
- 오류: LocalStorage 접근 차단 환경, QuotaExceeded 시 graceful degrade.

---

## **10) 폴더 구조(제안)**

```
app/
  page.tsx                // TodoPage
components/
  NewTodoInput.tsx
  FilterTabs.tsx
  SearchInput.tsx
  TodoList.tsx
  TodoItem.tsx
  EmptyState.tsx
hooks/
  useTodos.ts
lib/
  storage.ts              // load/save + throttle
  types.ts                // Todo/AppStateV1
```

---

## **11) 스타일 가이드 (최소)**

- 기본 폼 요소 우선 사용(필요 시 얇은 래퍼).
- 버튼/입력/체크박스는 일관된 높이/간격(예: h-9, gap-2).
- 에러/안내는 작은 배지 또는 텍스트(토스트는 선택).

---

## **12) 성능 고려**

- 검색 150ms 디바운스.
- LocalStorage 저장 250ms 쓰로틀.
- 리스트 항목 200개 이하 가정(가상 스크롤 불필요). 초과 시도 성능 검토.

---

## **13) 보안/안전**

- 사용자 입력은 React 기본 이스케이프에 의존, dangerouslySetInnerHTML 금지.
- 외부 전송 없음(로컬 전용). PII 입력을 유도하지 않음.

---

### **부록) 간단 구현 힌트**

```
// lib/storage.ts
let saveTimer: any = null;
export const STORAGE_KEY = 'todo-app:v1';

export function loadState(): AppStateV1 | null { /* 위 설계대로 */ }

export function saveStateThrottled(state: AppStateV1, delay = 250) {
  if (typeof window === 'undefined') return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* 용량/권한 오류 무시, 화면에만 안내 */ }
  }, delay);
}
```
