import { Navbar } from "./navbar";
import { Search } from "./search";
import { Chats } from "./chats";

export function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
