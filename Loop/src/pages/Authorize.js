import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

/* ─── 애니메이션 ─── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* 완료 이펙트 애니메이션 */
const glowExpand = keyframes`
  0%   { transform: scale(0.4); opacity: 0; }
  40%  { opacity: 1; }
  100% { transform: scale(2.8); opacity: 0; }
`;

const glowExpand2 = keyframes`
  0%   { transform: scale(0.2); opacity: 0; }
  30%  { opacity: 0.7; }
  100% { transform: scale(2.2); opacity: 0; }
`;

const popIn = keyframes`
  0%   { transform: scale(0.5); opacity: 0; }
  60%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeOut = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`;

/* ─── 완료 화면 스타일 ─── */
const CompletionScreen = styled.div`
  position: fixed;
  inset: 0;
  background: #F6FDF6;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: hidden;
  animation: ${p => p.exiting ? fadeOut : 'none'} 0.4s ease forwards;
`;

const GlowRing = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(58,125,68,0.45) 0%, rgba(58,125,68,0.12) 50%, transparent 75%);
  animation: ${glowExpand} 1.8s ease-out ${p => p.delay || '0s'} both;
`;

const GlowRing2 = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(76,175,80,0.55) 0%, rgba(76,175,80,0.15) 55%, transparent 75%);
  animation: ${glowExpand2} 1.5s ease-out 0.15s both;
`;

const GlowCore = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56,142,60,0.3) 0%, transparent 70%);
  filter: blur(8px);
`;

const CompletionText = styled.div`
  position: relative;
  z-index: 2;
  font-size: 28px;
  font-weight: 800;
  color: #2E7D32;
  letter-spacing: -0.5px;
  animation: ${popIn} 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
`;

/* ─── 기존 페이지 스타일 ─── */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #FAFAF8;
  animation: ${fadeIn} 0.25s ease both;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 52px 16px 12px;
  border-bottom: 1px solid #D0CFC8;
  background: #FAFAF8;
`;

const BackBtn = styled.button`
  width: 36px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: #1C1C1A;
  transition: opacity 0.15s;
  &:active { opacity: 0.6; }
`;

const HeaderTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #1C1C1A;
  letter-spacing: -0.3px;
`;

const HeaderSpacer = styled.div`
  width: 36px;
`;

const Body = styled.div`
  flex: 1;
  padding: 24px 20px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #1C1C1A;
  margin-bottom: 20px;
  letter-spacing: -0.4px;
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #F0EFEA;
  border-radius: 12px;
  border: 1.5px solid #D0CFC8;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: border-color 0.15s;
  &:hover { border-color: var(--color-primary); }
`;

const SelectedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DiagLine = styled.div`
  position: absolute;
  width: 90%;
  height: 1px;
  background: #D0CFC8;
  transform: ${p => p.right ? 'rotate(-45deg)' : 'rotate(45deg)'};
`;

const InnerBorder = styled.div`
  position: absolute;
  inset: 12px;
  border: 1px solid #D0CFC8;
  border-radius: 4px;
`;

const PlaceholderHint = styled.p`
  position: absolute;
  font-size: 13px;
  font-weight: 700;
  color: #9E9D96;
  bottom: 20px;
  width: 100%;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const RecentBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  color: #5E5E5A;
  padding: 4px 0;
  transition: color 0.15s;
  &:hover { color: var(--color-primary); }
`;

const SelectBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  background: #EBF5EC;
  border: 1px solid #C5DEC7;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 700;
  color: #3A7D44;
  transition: background 0.15s;
  &:active { background: #C5DEC7; }
`;

const Footer = styled.div`
  padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
  background: #FAFAF8;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 17px;
  background: ${p => p.disabled ? '#F0EFEA' : '#3A7D44'};
  color: ${p => p.disabled ? '#9E9D96' : '#FFFFFF'};
  border: none;
  border-radius: 12px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 700;
  cursor: ${p => p.disabled ? 'default' : 'pointer'};
  letter-spacing: -0.3px;
  box-shadow: ${p => p.disabled ? 'none' : '0 4px 16px rgba(58,125,68,0.3)'};
  transition: all 0.15s;
  &:active { opacity: ${p => p.disabled ? 1 : 0.88}; }
`;

const HiddenInput = styled.input`
  display: none;
`;

/* ─── 컴포넌트 ─── */
export default function Authorize({ onBack, onSubmit }) {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [exiting, setExiting] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setSelectedImage(url);
    };

    const openGallery = () => fileInputRef.current?.click();

    const handleSubmit = () => {
        if (!selectedImage) {
            alert('인증할 사진을 선택해주세요.');
            return;
        }
        // TODO: API 연동 — FormData로 이미지 업로드
        setShowCompletion(true);

        // 이펙트 재생 후 페이드 아웃 → navigate
        setTimeout(() => {
            setExiting(true);
            onSubmit?.();
        }, 1800);

        setTimeout(() => {
            navigate('/myactivity');
        }, 2200);
    };

    /* ── 완료 화면 ── */
    if (showCompletion) {
        return (
            <CompletionScreen exiting={exiting}>
                <GlowRing2 />
                <GlowRing delay="0s" />
                <GlowRing delay="0.3s" />
                <GlowCore />
                <CompletionText>작성 완료!</CompletionText>
            </CompletionScreen>
        );
    }

    return (
        <Page>
            {/* ── 헤더 ── */}
            <Header>
                <BackBtn onClick={onBack}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M14 17L8 11L14 5" stroke="currentColor" strokeWidth="2.2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </BackBtn>
                <HeaderTitle>인증</HeaderTitle>
                <HeaderSpacer />
            </Header>

            {/* ── 본문 ── */}
            <Body>
                <Subtitle>오늘의 실천을 인증해주세요.</Subtitle>

                <ImageBox onClick={openGallery}>
                    {selectedImage ? (
                        <SelectedImg src={selectedImage} alt="선택된 인증 사진" />
                    ) : (
                        <Placeholder>
                            <DiagLine />
                            <DiagLine right />
                            <InnerBorder />
                            <PlaceholderHint>사진을 탭해서 선택하세요</PlaceholderHint>
                        </Placeholder>
                    )}
                </ImageBox>

                <Row>
                    <RecentBtn onClick={openGallery}>최근 항목 ›</RecentBtn>
                    <SelectBtn onClick={openGallery}>
                        <span style={{ fontSize: 15 }}>⊞</span>
                        선택
                    </SelectBtn>
                </Row>
            </Body>

            {/* ── 작성 완료 ── */}
            <Footer>
                <SubmitBtn disabled={!selectedImage} onClick={handleSubmit}>
                    작성 완료
                </SubmitBtn>
            </Footer>

            <HiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </Page>
    );
}