"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [userAuthorized, setUserAuthorized] = useState(false);

  const onLoad = async () => {
    // toast.dismiss()
    // toast.loading("Loading...", {duration: 500})
    const response = await axios.get("/api/users/isLoggedIn");
    if (response.data.message === "User is Logged In!") {
      setUserAuthorized(true);
      return;
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const Router = useRouter();

  const taskQuotes = [
    "Tasks completed are the stepping stones to success.",
    "Stay productive, stay motivated.",
    "A checklist a day keeps procrastination away.",
    "Efficiency is doing things right. Effectiveness is doing the right things.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Focus on being productive instead of busy.",
    "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    "The key is not to prioritize what’s on your schedule, but to schedule your priorities.",
    "Start where you are. Use what you have. Do what you can.",
    "The secret of getting ahead is getting started.",
    "Productivity is being able to do things that you were never able to do before.",
    "You don’t have to see the whole staircase, just take the first step.",
    "Your future is created by what you do today, not tomorrow.",
    "The way to get started is to quit talking and begin doing.",
  ];

  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * taskQuotes.length);
    setRandomQuote(taskQuotes[randomIndex]);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.logo}>TaskNest</div>
          <div className={styles.authButtons}>
            <Link href="/about" className={styles.aboutLink}>
              About Page
            </Link>
            {!userAuthorized && (
              <>
                <button
                  className={styles.loginButton}
                  onClick={() => Router.push("/login")}
                >
                  Log in
                </button>
                <button
                  className={styles.signupButton}
                  onClick={() => Router.push("/signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={`${styles.title} bigTitle`}>
          {randomQuote || "Welcome to TaskNest"}
        </h1>
        <p className={styles.description}>
          TaskNest is a productivity app designed to help you organize your tasks efficiently. Whether you're managing personal projects or collaborating with a team, TaskNest ensures your tasks are always under control.
        </p>
        <div className={styles.buttons}>
          {userAuthorized ? (
            <div className="flex flex-col gap-4">
              <button
              className={styles.primaryButton}
              onClick={() => Router.push("/todolist")}
            >
              Go To To-Do List
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => Router.push("/profile")}
            >
              Go To Profile
            </button>
            </div>
          ) : (
            <button
              className={styles.primaryButton}
              onClick={() => Router.push("/signup")}
            >
              Get Started
            </button>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Aritra Dey, 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}
