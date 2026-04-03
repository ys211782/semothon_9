import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../../Loop/src/App.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!name.trim() || !phone.trim()) return;
    navigate("/profile", { state: { name, phone } });
  };

  const formatPhone = (val) => {
    const num = val.replace(/\D/g, "");
    if (num.length < 4) return num;
    if (num.length < 8) return num.slice(0, 3) + "-" + num.slice(3);
    return num.slice(0, 3) + "-" + num.slice(3, 7) + "-" + num.slice(7, 11);
  };

  return (
    <div className="screen">
      {/* 상태바 */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 0", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
      </div>

      {/* 뒤로가기 */}
      <button className="back-btn" onClick={() => navigate("/")}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#495057" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="screen-body" style={{ paddingTop: 16 }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.3, marginBottom: 8 }}>
            이름이 무엇인가요?
          </div>
          <div style={{ fontSize: 14, color: "var(--gray-400)" }}>
            LOOP에서 사용할 정보를 입력해 주세요
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-500)", marginBottom: 6 }}>이름</div>
          <input
            className="input-field"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-500)", marginBottom: 6 }}>전화번호</div>
          <input
            className="input-field"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            maxLength={13}
            inputMode="numeric"
          />
        </div>

      </div>

      <div className="bottom-bar">
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!name.trim() || !phone.trim()}
        >
          다음
        </button>
      </div>
    </div>
  );
}
