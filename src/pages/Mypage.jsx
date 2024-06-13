import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
const Stwrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  padding: 30px;
  border-radius: 30px;
  background-color: #fff08c;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;
const StFormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 450px;
  padding: 30px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  h2 {
    font-size: 30px;
    letter-spacing: 2px;
    color: #101010;
  }

  button {
    width: 100%;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    background-color: #ecfc7c;
    color: #101010;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
`;

const StBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  label {
    width: 88px;
    margin-right: 30px;
    color: #101010;
  }

  input {
    width: 250px;
    padding: 8px 8px;
  }

  .imageInput {
    width: 70px;
    color: transparent;
    overflow: hidden;
  }
  img {
    width: 40px;
    height: 40px;
  }
`;

const Mypage = () => {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  // 파일을 보낼때
  const [preview, setPreview] = useState("");
  // 선택할 파일을 보여줄때
  const accessToken = localStorage.getItem("accessToken");

  const getUserInfo = async (accessToken) => {
    const { data } = await axios.get(
      "https://moneyfulpublicpolicy.co.kr/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  };

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(accessToken),
  });
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
    }
  }, [userInfo]);

  const Formhandler = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("avatar", image);
    // formData.append("nickname", nickname);
    // console.log(formData);
    const response = await axios.patch(
      "https://moneyfulpublicpolicy.co.kr/profile",
      { avatar, nickname },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
  };
  const nicknameInput = (e) => {
    setNickname(e.target.value);
  };

  const imageInput = (e) => {
    // console.log(e.target.files);
    // setImage(e.target.files[0]);
    let file = e.target.files[0];
    setAvatar(file);
    console.log(file);
    let fileRead = new FileReader();
    fileRead.onload = function () {
      setPreview(fileRead.result);
    };

    fileRead.readAsDataURL(file);
  };
  console.log(avatar);
  // const newImageUrl = setImage();
  return (
    <Stwrap>
      <StContainer>
        <StFormBox onSubmit={Formhandler}>
          <h2>프로필 수정</h2>
          <StBox>
            <label htmlFor="nickname">닉네임</label>
            <input
              value={nickname}
              onChange={nicknameInput}
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              pattern="^[가-힣a-zA-Z0-9\s]{1,10}$"
            />
          </StBox>
          <StBox>
            <label htmlFor="image">프로필 이미지</label>
            <input
              className="imageInput"
              type="file"
              onChange={imageInput}
              id="image"
            />
            {/* {(image = null ? "" : <img src={image} />)} */}
            {preview && <img src={preview} />}
            {/* <img src={image} /> */}
          </StBox>
          <button>프로필 업데이트</button>
        </StFormBox>
      </StContainer>
    </Stwrap>
  );
};

export default Mypage;
