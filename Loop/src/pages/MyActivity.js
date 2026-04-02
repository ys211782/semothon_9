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

/* ─── 스타일 ─── */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
  animation: ${fadeSlideUp} 0.3s ease both;
`;

/* 상단 헤더 + 상태 배너 */
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
    transition: width 0.15s;
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

/* 본문 스크롤 영역 */
const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
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

/* 인증 이미지 영역 */
const ImageArea = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: #F6FBF6;
  border-radius: 10px;
  border: 1.5px solid #C5DEC7;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #9E9D96;
`;

const PlaceholderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #EBF5EC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const PlaceholderText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #A8A8A0;
`;

/* 검토 중 배지 */
const ReviewBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.92);
  border: 1px solid #C5DEC7;
  border-radius: 40px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 800;
  color: #3A7D44;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

/* 하단 액션 바 */
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
  &:active { color: #E53935; }
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

/* 홈 돌아가기 버튼 */
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
export default function MyActivity() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // 현재 시각 포맷
  const now = new Date();
  const timestamp = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

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

          {/* 인증 이미지 */}
          <ImageArea>
            <ImagePlaceholder>
              <PlaceholderIcon>📸</PlaceholderIcon>
              <PlaceholderText>인증 사진</PlaceholderText>
            </ImagePlaceholder>
            <ReviewBadge>
              <span>⏳</span> 검토 중
            </ReviewBadge>
          </ImageArea>

          {/* 좋아요 */}
          <ActionBar>
            <LikeBtn onClick={() => setLiked(p => !p)}>
              <span style={{ fontSize: 18 }}>{liked ? '❤️' : '🤍'}</span>
              {liked ? '1' : '0'}
            </LikeBtn>
          </ActionBar>
        </UserCard>

        {/* 안내 메시지 */}
        <InfoBanner>
          <InfoIcon>ℹ️</InfoIcon>
          <InfoText>
            <div className="title">인증 검토 안내</div>
            <div className="desc">
              팀원들이 인증 사진을 확인하고 있어요.{'\n'}
              완료되면 포인트가 자동으로 지급됩니다.
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
