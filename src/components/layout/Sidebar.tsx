export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav aria-label="Primary navigation" className="app-sidebar__nav">
        <a className="app-sidebar__link" href="#">
          Dashboard
        </a>
        <a className="app-sidebar__link" href="#">
          Transactions
        </a>
        <a className="app-sidebar__link" href="#">
          Reports
        </a>
      </nav>
    </aside>
  );
}
