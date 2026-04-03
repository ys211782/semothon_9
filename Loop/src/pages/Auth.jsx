import { useNavigate } from "react-router-dom";
import "../App.css";


export default function Auth() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => { window.location.href = "/api/auth/google"; };
  const handleAppleLogin = () => { window.location.href = "/api/auth/apple"; };

  return (
    <div className="screen" style={{ background:  "linear-gradient(160deg, #FFF 0%, #ADFFD2 100%)"
      }}>
      {/* 상단 상태바 */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 0", fontSize: 12, fontWeight: 600, color: "#fff" }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="white"/><rect x="4.5" y="2" width="3" height="10" rx="1" fill="white"/><rect x="9" y="0" width="3" height="12" rx="1" fill="white"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="rgba(255,255,255,0.4)"/></svg>
          <svg width="16" height="12" viewBox="0 0 24 16" fill="none"><path d="M12 4C15.5 4 18.6 5.5 20.8 8L22.6 6.2C19.9 3.5 16.1 2 12 2C7.9 2 4.1 3.5 1.4 6.2L3.2 8C5.4 5.5 8.5 4 12 4Z" fill="white"/><path d="M12 8C14.2 8 16.2 8.9 17.7 10.4L19.5 8.6C17.5 6.6 14.9 5.5 12 5.5C9.1 5.5 6.5 6.6 4.5 8.6L6.3 10.4C7.8 8.9 9.8 8 12 8Z" fill="white"/><circle cx="12" cy="14" r="2" fill="white"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(255,255,255,0.5)"/><rect x="2" y="2" width="16" height="8" rx="2" fill="white"/><path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="rgba(255,255,255,0.4)"/></svg>
        </span>
      </div>

      {/* 로고 + 타이틀 영역 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
        <div style={{ fontSize: 14, color: "rgb(3 199 90)", textAlign: "center", lineHeight: 1.7, marginBottom: 20 }}>
          함께 만드는 긍정적인 루프
        </div>
        <div style={{
          fontSize: 50,
          fontWidth: "extra-expanded",
          fontWeight: 1000,
          color: "#03C75A",
          letterSpacing: -5,
          lineHeight: 1,
          fontFamily: "'Righteous', cursive",
          transform: "scaleY(0.8) scaleX(1.2)",
          display: "inline-block",
          WebkitTextStroke: "4px #03C75A",
        }}>
          LOOP
        </div>

        <div style={{ fontSize: 15, color: "rgb(3 199 90)", textAlign: "center", lineHeight: 1.7, marginTop:10}}>
          루프에 오신 것을 환영합니다!
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{ padding: "0 24px 48px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="btn btn-social" onClick={handleAppleLogin}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15.4 12.8C15.1 13.5 14.7 14.1 14.3 14.6C13.7 15.3 13.2 15.7 12.6 15.7C12.1 15.7 11.4 15.5 10.6 15.1C9.8 14.7 9.1 14.5 8.5 14.5C7.9 14.5 7.2 14.7 6.4 15.1C5.6 15.5 4.9 15.7 4.4 15.7C3.7 15.7 3.1 15.3 2.5 14.5C1.9 13.7 1.4 12.8 1 11.7C0.6 10.5 0.4 9.4 0.4 8.3C0.4 7.1 0.7 6.1 1.3 5.3C1.8 4.7 2.4 4.3 3.2 4C4 3.7 4.8 3.5 5.7 3.5C6.3 3.5 7.1 3.7 8 4.1C9 4.5 9.6 4.7 9.8 4.7C10 4.7 10.6 4.5 11.7 4C12.7 3.6 13.6 3.5 14.3 3.6C15.9 3.8 17.1 4.6 17.8 6C16.4 6.8 15.7 8 15.7 9.5C15.7 10.8 16.2 11.9 17.1 12.7C15.5 12.8 15.4 12.8 15.4 12.8ZM11.3 0.4C11.3 1.4 10.9 2.3 10.2 3C9.4 3.8 8.5 4.2 7.5 4.1C7.5 3.1 7.9 2.2 8.6 1.5C8.9 1.2 9.3 0.9 9.8 0.7C10.3 0.5 10.8 0.4 11.3 0.4Z" fill="#212529"/>
          </svg>
          Apple 계정으로 시작하기
        </button>

        <button className="btn btn-social" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.6 9.2C17.6 8.6 17.5 8 17.4 7.4H9V10.8H13.8C13.6 11.9 12.9 12.8 12 13.4V15.6H14.9C16.6 14 17.6 11.8 17.6 9.2Z" fill="#4285F4"/>
            <path d="M9 17.7C11.4 17.7 13.5 16.9 14.9 15.6L12 13.4C11.2 13.9 10.2 14.2 9 14.2C6.7 14.2 4.7 12.6 4 10.4H1V12.7C2.4 15.5 5.5 17.7 9 17.7Z" fill="#34A853"/>
            <path d="M4 10.4C3.8 9.8 3.7 9.2 3.7 8.5C3.7 7.8 3.8 7.2 4 6.6V4.3H1C0.4 5.5 0 6.9 0 8.5C0 10.1 0.4 11.5 1 12.7L4 10.4Z" fill="#FBBC05"/>
            <path d="M9 2.8C10.3 2.8 11.5 3.3 12.4 4.1L15 1.5C13.5 0.1 11.4-0.5 9-0.5C5.5-0.5 2.4 1.7 1 4.5L4 6.8C4.7 4.6 6.7 2.8 9 2.8Z" fill="#EA4335"/>
          </svg>
          Google 계정으로 시작하기
        </button>

        <div className="divider" style={{ "--divider-color": "rgba(255,255,255,0.3)" }}>
          <span style={{ color: "rgb(3 199 90)" }}>또는</span>
        </div>

        <button className="btn" style={{ background: "rgba(255,255,255,0.2)", color: "#03c75a", border: "1.5px solid rgba(255,255,255,0.4)" }} onClick={() => navigate("/signup")}>
          이메일로 시작하기
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: "rgb(3 199 90)", marginTop: 8, lineHeight: 1.7 }}>LOOP의{" "}
          <span style={{ color: "#03c75a", fontWeight: 600, cursor: "pointer" }}>이용약관</span>
          {" "}및{" "}
          <span style={{ color: "#03c75a", fontWeight: 600, cursor: "pointer" }}>개인정보처리방침</span>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
