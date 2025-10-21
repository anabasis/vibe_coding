(() => {
  const DURATION_SECONDS = 120; // 2 minutes
  const BOARD_SIZE = 24; // number of apples
  const MIN_VALUE = 1;
  const MAX_VALUE = 9;

  const boardEl = document.getElementById("board");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const toastEl = document.getElementById("toast");

  let selectedIds = new Set();
  let idToValue = new Map();
  let score = 0;
  let remaining = DURATION_SECONDS;
  let intervalId = null;
  let isRunning = false;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatTime(total) {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(total % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 1000);
  }

  function createApple(id, value) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "apple";
    el.dataset.id = String(id);
    el.textContent = String(value);
    el.setAttribute("aria-pressed", "false");
    el.draggable = false;
    el.addEventListener("dragstart", (e) => e.preventDefault());
    el.addEventListener("mousedown", (e) => e.preventDefault());
    el.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches && e.touches.length > 1) return;
        e.preventDefault();
      },
      { passive: false }
    );
    el.addEventListener("click", onAppleClick);
    return el;
  }

  function mountBoard() {
    boardEl.innerHTML = "";
    idToValue.clear();
    selectedIds.clear();
    for (let i = 0; i < BOARD_SIZE; i++) {
      const val = randInt(MIN_VALUE, MAX_VALUE);
      idToValue.set(i, val);
      boardEl.appendChild(createApple(i, val));
    }
  }

  function onAppleClick(e) {
    if (!isRunning) return;
    const el = e.currentTarget;
    const id = Number(el.dataset.id);
    const wasSelected = selectedIds.has(id);
    if (wasSelected) {
      selectedIds.delete(id);
      el.classList.remove("selected");
      el.setAttribute("aria-pressed", "false");
    } else {
      selectedIds.add(id);
      el.classList.add("selected");
      el.setAttribute("aria-pressed", "true");
    }
    evaluateSelection();
  }

  function evaluateSelection() {
    // Only act when there are at least 2 apples selected
    if (selectedIds.size < 2) return;
    const values = Array.from(selectedIds).map((id) => idToValue.get(id) || 0);
    const total = values.reduce((a, b) => a + b, 0);
    if (total === 10) {
      // Success: score points equal to number of apples selected
      const points = values.length * 10;
      score += points;
      scoreEl.textContent = String(score);
      showToast(`+${points}점!`);
      animateAndRespawn(true);
    } else if (total > 10) {
      // Clear selection when over 10 with a small penalty
      score = Math.max(0, score - 5);
      scoreEl.textContent = String(score);
      showToast("초과! -5점");
      animateAndShakeOnly();
    } else {
      // If below 10, let them continue selecting
      return;
    }
  }

  function animateAndRespawn() {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => {
      const el = boardEl.querySelector(`.apple[data-id="${id}"]`);
      if (!el) return;
      el.classList.remove("selected");
      el.classList.add("good", "hidden");
      setTimeout(() => {
        const newVal = randInt(MIN_VALUE, MAX_VALUE);
        idToValue.set(id, newVal);
        el.textContent = String(newVal);
        el.classList.remove("good");
        // show after a tiny delay to allow reflow for transition
        requestAnimationFrame(() => {
          el.classList.remove("hidden");
        });
      }, 220);
    });
    selectedIds.clear();
  }

  function animateAndShakeOnly() {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => {
      const el = boardEl.querySelector(`.apple[data-id="${id}"]`);
      if (!el) return;
      el.classList.remove("selected");
      el.classList.add("bad");
      setTimeout(() => {
        el.classList.remove("bad");
      }, 220);
    });
    selectedIds.clear();
  }

  function tick() {
    remaining -= 1;
    timerEl.textContent = formatTime(remaining);
    if (remaining <= 0) {
      stop();
      endGame();
    }
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    remaining = DURATION_SECONDS;
    timerEl.textContent = formatTime(remaining);
    intervalId = setInterval(tick, 1000);
  }

  function stop() {
    isRunning = false;
    startBtn.disabled = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function endGame() {
    const message = `종료! 최종 점수: ${score}`;
    showToast(message);
    // disable clicks by setting running false; keep board visible
  }

  function reset() {
    stop();
    score = 0;
    scoreEl.textContent = "0";
    remaining = DURATION_SECONDS;
    timerEl.textContent = formatTime(remaining);
    mountBoard();
  }

  // Event bindings
  startBtn.addEventListener("click", () => {
    reset();
    start();
  });
  resetBtn.addEventListener("click", () => {
    reset();
  });

  // Initialize
  mountBoard();
  timerEl.textContent = formatTime(remaining);
})();
