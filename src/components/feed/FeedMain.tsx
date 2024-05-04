import React from "react";
import feedMainStyle from "./styles/feedMain.module.css";
import FeedList from "./FeedList";
import FeedInfo from "./FeedInfo";

function FeedMain() {
  return (
    <main className={feedMainStyle.feed_main}>
      <FeedList />
      <FeedInfo />
    </main>
  );
}

export default FeedMain;
