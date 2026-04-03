import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../../../Documents/GitHub/semothon_9/Loop/src/pages/logo2.png";
import Home1 from "../../../Documents/GitHub/semothon_9/Loop/src/pages/Home1.png";
import Home2 from "../../../Documents/GitHub/semothon_9/Loop/src/pages/Home2.png";
import Home3 from "../../../Documents/GitHub/semothon_9/Loop/src/pages/Home3.png";
import Home4 from "../../../Documents/GitHub/semothon_9/Loop/src/pages/Home4.png";

const SLIDES = [
  { img: Home1, title: "환경은 일상의 일부니까", desc: "작은 실천이 쌓여 더 나은 지구를\n만들어 나갈 수 있어요." },
  { img: Home2, title: "같이 시작해요!", desc: "친구들과 함께 환경 활동을 공유하고\n서로 응원해보세요." },
  { img: Home3, title: "나의 활동이 한 눈에", desc: "나의 친환경 활동을 한눈에 확인하고\n꾸준히 이어나가요." },
  { img: Home4, title: "실천하고\n포인트로 쌓아보세요.", desc: "활동을 완료하면 포인트가 쌓이고\n다양한 혜택을 누려보세요." },
  { logo: true, title: "이제 시작해볼까요?", desc: "" },
];

export default function Home() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    if (current < SLIDES.length - 1) setCurrent(current + 1);
    else navigate("/main");
  };

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  return (
      <div
          className="screen"
          style={isLast ? { background: "linear-gradient(160deg, #FFF 0%, #03C75A 100%)" } : {}}
      >
        {/* 콘텐츠 */}
        <div
            key={current}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 32px",
              textAlign: "center",
              animation: "fadeUp 0.3s ease both",
            }}
        >
          {slide.logo ? (
              <img
                  src={logo}
                  alt="LOOP"
                  style={{ width: 300, height: 300, borderRadius: 32}}
              />
          ) : (
              <img
                  src={slide.img}
                  alt={slide.title}
                  style={{ width: 240, height: 240, objectFit: "contain", marginBottom: 32 }}
              />
          )}

          {/* 마지막 슬라이드에만 LOOP 로고 텍스트 */}
          {isLast && (
              <div
                  style={{
                    fontSize: 80,
                    fontWeight: 1000,
                    color: "white",
                    letterSpacing: -5,
                    lineHeight: 1,
                    fontFamily: "'Righteous', cursive",
                    transform: "scaleY(0.8) scaleX(1.2)",
                    display: "inline-block",
                    WebkitTextStroke: "4px white",
                    marginBottom: 20,
                  }}
              >
                LOOP
              </div>
          )}

          <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.8,
                lineHeight: 1.3,
                marginBottom: 14,
                whiteSpace: "pre-line",
                color: isLast ? "white" : "var(--gray-900)",
              }}
          >
            {slide.title}
          </div>

          {slide.desc && (
              <div
                  style={{
                    fontSize: 15,
                    color: isLast ? "rgba(255,255,255,0.75)" : "var(--gray-400)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
              >
                {slide.desc}
              </div>
          )}
        </div>

        {/* 점 인디케이터 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 20 }}>
          {SLIDES.map((_, i) => (
              <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === current
                        ? (isLast ? "white" : "var(--green-primary)")
                        : (isLast ? "rgba(255,255,255,0.4)" : "var(--gray-200)"),
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
              />
          ))}
        </div>

        {/* 하단 버튼 */}
        <div
            className="bottom-bar"
            style={isLast ? { background: "transparent", borderTop: "none" } : {}}
        >
          <button
              className="btn btn-primary"
              onClick={goNext}
              style={isLast ? { background: "white", color: "var(--green-dark)" } : {}}
          >
            {isLast ? "시작하기" : "다음"}
          </button>
        </div>
      </div>
  );
}