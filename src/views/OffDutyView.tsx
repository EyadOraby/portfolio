import { hobbies, interests } from "../content";
import { ViewShell } from "./ViewShell";

type Item = { title: string; text: string; emoji: string };

function Cards({ items }: { items: Item[] }) {
  return (
    <ul className="hobbies">
      {items.map((item) => (
        <li key={item.title} className="hobby" data-reveal>
          <span className="hobby-emoji" aria-hidden="true">
            {item.emoji}
          </span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function OffDutyView({ onBack }: { onBack: () => void }) {
  return (
    <ViewShell title="Off the clock" kicker="You found it" accent="#4fd1a5" onBack={onBack}>
      <p className="lead">
        Most people only read the time. You held on long enough to clock out with me, so here is what I do when
        the laptop is closed, and the corners of tech I explore just because I enjoy them.
      </p>
      <section aria-labelledby="life-heading">
        <h2 id="life-heading">Away from the keyboard</h2>
        <Cards items={hobbies} />
      </section>
      <section aria-labelledby="curious-heading">
        <h2 id="curious-heading">Tech I explore for fun</h2>
        <Cards items={interests} />
      </section>
    </ViewShell>
  );
}
