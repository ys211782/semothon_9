import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

/* ─── 애니메이션 ─── */
const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;

/* ─── 스타일 ─── */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
  animation: ${fadeSlideUp} 0.3s ease both;
`;

/* 상단 헤더 */
const Header = styled.div`
  background: linear-gradient(160deg, #E8F5E9 0%, #F1FAF2 60%, #FAFAF8 100%);
  padding: 52px 20px 20px;
  border-bottom: 1px solid #D4EDD6;
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: var(--color-primary); }
`;

const MenuBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;

  span {
    display: block;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
  }
  span:nth-of-type(1) { width: 20px; }
  span:nth-of-type(2) { width: 14px; }
  span:nth-of-type(3) { width: 18px; }
`;

const StatusTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #2E7D32;
  letter-spacing: -0.4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PulseDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4CAF50;
  animation: ${pulse} 1.6s ease-in-out infinite;
  flex-shrink: 0;
`;

const StatusSub = styled.p`
  font-size: 13px;
  color: #5A8A5F;
  font-weight: 600;
  margin-top: 5px;
`;

/* 본문 */
const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

/* 사용자 카드 */
const UserCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  border: 1.5px solid var(--color-border);
  animation: ${fadeSlideUp} 0.35s ease 0.1s both;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-pale);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const UserMeta = styled.div`
  flex: 1;
  .name { font-size: 14px; font-weight: 800; color: var(--color-text); }
`;

const Timestamp = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
`;

/* ── 이미지 영역 ── */
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid #C5DEC7;
  cursor: pointer;
  user-select: none;
`;

/* 흰색 업로드 이미지 */
const WhiteImage = styled.div`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #C8C8C0;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
`;

/* 인증/반려 오버레이 */
const ActionOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  animation: ${scaleIn} 0.2s ease both;
`;

const ActionBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 22px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  font-size: 15px;
  font-weight: 800;
  transition: transform 0.12s, opacity 0.12s;

  background: ${p => p.approve ? '#2E7D32' : '#B71C1C'};
  color: white;
  box-shadow: ${p => p.approve
    ? '0 4px 16px rgba(46,125,50,0.45)'
    : '0 4px 16px rgba(183,28,28,0.45)'};

  &:active { transform: scale(0.95); opacity: 0.9; }

  .icon { font-size: 24px; }
`;

/* 결과 배지 (인증/반려 후) */
const ResultBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${p => p.approved ? 'rgba(46,125,50,0.92)' : 'rgba(183,28,28,0.92)'};
  color: white;
  border-radius: 40px;
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  animation: ${fadeSlideUp} 0.25s ease both;
`;

/* 좋아요 */
const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const LikeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-secondary);
  padding: 8px 0;
  transition: color 0.15s;
`;

/* 안내 배너 */
const InfoBanner = styled.div`
  margin-top: 16px;
  background: #F0F8F1;
  border: 1px solid #C8E6C9;
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  animation: ${fadeSlideUp} 0.35s ease 0.2s both;
`;

const InfoIcon = styled.div`
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
`;

const InfoText = styled.div`
  .title { font-size: 13px; font-weight: 800; color: #2E7D32; }
  .desc  { font-size: 12px; color: #5A8A5F; font-weight: 600; margin-top: 3px; line-height: 1.5; }
`;

/* 홈 돌아가기 */
const HomeBtn = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 15px;
  background: none;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  animation: ${fadeSlideUp} 0.35s ease 0.3s both;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

/* ─── 컴포넌트 ─── */
export default function NPCActivity() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);   // 이미지 클릭 시 인증/반려 오버레이
  const [reviewResult, setReviewResult] = useState(null);  // 'approved' | 'rejected' | null

  const now = new Date();
  const timestamp = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const handleImageClick = () => {
    if (reviewResult) return; // 이미 결정됐으면 무시
    setShowActions(prev => !prev);
  };

  const handleApprove = (e) => {
    e.stopPropagation();
    setReviewResult('approved');
    setShowActions(false);
  };

  const handleReject = (e) => {
    e.stopPropagation();
    setReviewResult('rejected');
    setShowActions(false);
  };

  return (
    <Page>
      {/* ── 상단 헤더 ── */}
      <Header>
        <NavRow>
          <BackBtn onClick={() => navigate(-1)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 17L8 11L14 5" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackBtn>
          <MenuBtn>
            <span /><span /><span />
          </MenuBtn>
        </NavRow>

        <StatusTitle>
          <PulseDot />
          인증 대기 중이에요.
        </StatusTitle>
        <StatusSub>서로의 실천을 확인 중입니다.</StatusSub>
      </Header>

      {/* ── 본문 ── */}
      <Body>
        <UserCard>
          {/* 사용자 정보 */}
          <UserRow>
            <Avatar>🐻‍❄️</Avatar>
            <UserMeta>
              <div className="name">사용자 1</div>
            </UserMeta>
            <Timestamp>{timestamp}</Timestamp>
          </UserRow>

          {/* 인증 이미지 — 흰색 이미지 업로드 상태 */}
          <ImageWrapper onClick={handleImageClick}>
            <WhiteImage>
              {/* 흰 배경 위에 연한 힌트 */}
              <ImageHint>
                <span style={{ fontSize: 28 }}>🖼️</span>
                <span>사진을 탭해 인증하세요</span>
              </ImageHint>
            </WhiteImage>

            {/* 인증/반려 오버레이 */}
            {showActions && !reviewResult && (
              <ActionOverlay onClick={() => setShowActions(false)}>
                <ActionBtn approve onClick={handleApprove}>
                  <span className="icon">✅</span>
                  인증
                </ActionBtn>
                <ActionBtn onClick={handleReject}>
                  <span className="icon">❌</span>
                  반려
                </ActionBtn>
              </ActionOverlay>
            )}

            {/* 결과 배지 */}
            {reviewResult && (
              <ResultBadge approved={reviewResult === 'approved'}>
                {reviewResult === 'approved' ? '✅ 인증 완료' : '❌ 반려됨'}
              </ResultBadge>
            )}
          </ImageWrapper>

          {/* 좋아요 */}
          <ActionBar>
            <LikeBtn onClick={() => setLiked(p => !p)}>
              <span style={{ fontSize: 18 }}>{liked ? '❤️' : '🤍'}</span>
              {liked ? '1' : '0'}
            </LikeBtn>
          </ActionBar>
        </UserCard>

        {/* 안내 배너 */}
        <InfoBanner>
          <InfoIcon>ℹ️</InfoIcon>
          <InfoText>
            <div className="title">팀원 인증 확인</div>
            <div className="desc">
              사진을 탭하면 인증 또는 반려할 수 있어요.{'\n'}
              팀원의 실천을 함께 확인해주세요!
            </div>
          </InfoText>
        </InfoBanner>

        {/* 홈으로 */}
        <HomeBtn onClick={() => navigate('/')}>
          🏠 홈으로 돌아가기
        </HomeBtn>
      </Body>
    </Page>
  );
}
