"use client";

import { useGlobalState } from "@/context/global-provider";
import { arrowLeft, bars, logout } from "@/utils/icons";
import menu from "@/utils/menu";
import Button from "../button/button";

import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const { user } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay" />
        <div className="image">
          <Image
            src={user?.imageUrl || "/profile.png"}
            alt="profile"
            width={70}
            height={70}
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${pathname === item.link ? "active" : ""}`}
            onClick={() => handleClick(item.link)}
          >
            {item.icon}
            <Link href={item.link}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          onClick={() => signOut(() => router.push("/sign-in"))}
        />
      </div>
    </SidebarStyled>
  );
}

export default Sidebar;

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.sidebarWidth};
  background-color: ${({ theme }) => theme.colorBg2};
  border: 2px solid ${({ theme }) => theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${({ theme }) => theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${({ collapsed }) =>
      collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -69px;
    top: 1.8rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    background-color: ${({ theme }) => theme.colorBg2};
    border-right: 2px solid ${({ theme }) => theme.borderColor2};
    border-top: 2px solid ${({ theme }) => theme.borderColor2};
    border-bottom: 2px solid ${({ theme }) => theme.borderColor2};
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    position: relative;
    margin: 1.5rem;
    padding: 1rem 0.8rem;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${({ theme }) => theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background-color: ${({ theme }) => theme.colorBg3};
      border-radius: 1rem;
      transition: all 0.55s linear;
      border: 2px solid ${({ theme }) => theme.borderColor2};
      opacity: 0.2;
      z-index: 0;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      border-radius: 100%;
      overflow: hidden;
      transition: all 0.5s ease;
      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 1rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${({ theme }) => theme.borderColor2};
      }

      .image {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.9rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      border-radius: 0 0.5rem 0.5rem 0;
      background-color: ${({ theme }) => theme.activeNavLinkHover};
      transition: all 0.3s ease-in-out;
      z-index: 1;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 100%;
      border-radius: 0.5rem 0 0 0.5rem;
      background-color: ${({ theme }) => theme.colorGreenDark};
      transition: all 0.3s ease-in-out;
      z-index: 1;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }

    i {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colorIcons};
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }
  }

  .nav-item.active {
    background-color: ${({ theme }) => theme.activeNavLink};

    i,
    a {
      color: ${({ theme }) => theme.colorIcons2};
    }

    &::before {
      width: 0.3rem;
    }
  }

  > button {
    margin: 1.5rem;
  }
`;
