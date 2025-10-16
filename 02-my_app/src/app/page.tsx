"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [showModal, setShowModal] = useState(false);
  const surfaceClass = useMemo(
    () => (theme === "dark" ? "btn-surface-dark" : "btn-surface-light"),
    [theme]
  );

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? (stored as Theme) : prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="card-surface">
        {/* Theme toggle in card corner */}
        <button
          aria-label="toggle theme"
          onClick={toggleTheme}
          className="absolute top-4 right-4 rounded-full w-9 h-9 flex items-center justify-center bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/80 shadow-sm"
          title="Toggle theme"
        >
          <span
            className="text-base"
            role="img"
            aria-label={theme === "dark" ? "light" : "dark"}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </span>
        </button>

        {/* Profile Section */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="avatar-ring rounded-full w-28 h-28 flex items-center justify-center shadow-md">
            <div className="rounded-full w-24 h-24 bg-white/70 dark:bg-black/20" />
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight">
            anabasis
          </h1>
          <p className="text-[14px] text-[#666] dark:text-[#CCCCCC]">
            누구나 만들 수 있음
          </p>
        </div>

        {/* Link List Section */}
        <div className="w-full mt-8 flex flex-col gap-4">
          <a
            className={`btn-cta grad-blue flex items-center justify-center`}
            href="https://open.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            오픈 카카오톡
          </a>
          <a
            className={`btn-cta grad-red flex items-center justify-center`}
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            유튜브
          </a>
          <a
            className={`btn-cta grad-purple flex items-center justify-center`}
            href="https://www.threads.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            스레드
          </a>
          <a
            className={`btn-cta grad-sky flex items-center justify-center`}
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            링크드인
          </a>
          <button
            className={`btn-cta grad-sky`}
            onClick={() => setShowModal(true)}
          >
            문의하기
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        theme={theme}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

function ContactModal({
  theme,
  show,
  onClose,
}: {
  theme: Theme;
  show: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // close on escape
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const surfaceClass =
    theme === "dark" ? "btn-surface-dark" : "btn-surface-light";

  const submit = async () => {
    if (!name.trim() || !email.trim()) {
      setError("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("문의가 전송되었습니다.");
        onClose();
        setName("");
        setEmail("");
      } else {
        setError(data.error || "전송 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <div
            className="glass-modal relative z-10 w-[92%] max-w-[440px] rounded-2xl p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="contact-title" className="text-lg font-semibold">
                문의하기
              </h2>
              <button
                aria-label="close"
                onClick={onClose}
                className="text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {error && (
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  {error}
                </div>
              )}
              <input
                className={`w-full rounded-lg px-3 py-2 outline-none ${
                  theme === "dark"
                    ? "bg-[#1f1f1f] text-white placeholder:text-neutral-400"
                    : "bg-white text-black placeholder:text-neutral-500"
                }`}
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
              <input
                className={`w-full rounded-lg px-3 py-2 outline-none ${
                  theme === "dark"
                    ? "bg-[#1f1f1f] text-white placeholder:text-neutral-400"
                    : "bg-white text-black placeholder:text-neutral-500"
                }`}
                placeholder="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="btn-cta grad-blue"
                onClick={submit}
                disabled={isLoading}
              >
                {isLoading ? "전송 중..." : "보내기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
