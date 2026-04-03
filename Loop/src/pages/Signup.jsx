import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";



export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const goNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const res = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            email,
          }),
        });

        const data = await res.json();
        console.log("저장 성공:", data);

        // 🔥 저장 끝나고 프로필로 이동
        navigate("/profile", {
          state: { email, phone },
        });

      } catch (err) {
        console.error("에러:", err);
      }
    }
  };
  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/");
  };

  const canNext = () => {
    if (step === 1) return phone.trim().length >= 9;
    if (step === 2) return email.includes("@");
    return true;
  };

  return (
      <div className="screen">
        {/* 상태바 */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 0", fontSize: 12, fontWeight: 600 }}>
          <span>9:41</span>
        </div>

        {/* 뒤로가기 + 건너뛰기 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 24px 0" }}>
          <button className="back-btn" style={{ padding: 0 }} onClick={goBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#495057" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {step < 3 && (
              <button onClick={() => setStep(step + 1)} style={{ background: "none", border: "none", fontSize: 14, color: "var(--gray-400)", cursor: "pointer", fontFamily: "var(--font)" }}>
                건너뛰기
              </button>
          )}
        </div>

        <div className="screen-body" style={{ paddingTop: 32 }}>
          {/* STEP 1: 전화번호 */}
          {step === 1 && (
              <div className="profile-step">
                <div className="step-header">
                  <div className="step-title">전화번호를 입력하세요.</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{
                    padding: "15px 16px",
                    border: "1.5px solid var(--gray-200)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--gray-50)",
                    fontSize: 15,
                    color: "var(--gray-500)",
                    whiteSpace: "nowrap",
                  }}>
                    +82
                  </div>
                  <input
                      className="input-field"
                      style={{ flex: 1, marginBottom: 0 }}
                      placeholder="010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      autoFocus
                  />
                </div>
              </div>
          )}

          {/* STEP 2: 이메일 */}
          {step === 2 && (
              <div className="profile-step">
                <div className="step-header">
                  <div className="step-title">이메일 주소를 입력하세요.</div>
                </div>
                <input
                    className="input-field"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputMode="email"
                    autoFocus
                />
              </div>
          )}

          {/* STEP 3: 계정 연결 안내 */}
          {step === 3 && (
              <div className="profile-step">
                <div className="step-header">
                  <div className="step-title">계정을 연결하면 로그인이{"\n"}더욱 빨라져요</div>
                  <div className="step-sub" style={{ marginTop: 12 }}>
                    전화번호 또는 이메일에 한 번 등록할 경우,<br />연결된 계정으로 로그인이 가능해요.
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="bottom-bar">
          <button className="btn btn-primary" onClick={goNext} disabled={!canNext()}>
            시작하기
          </button>
        </div>
      </div>
  );
}
