import { Sidebar } from "../components/sidebar";
import { Chat } from "../components/chat";

export function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
