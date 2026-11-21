import { hobbies } from "../content";
import { ViewShell } from "./ViewShell";

export function OffDutyView({ onBack }: { onBack: () => void }) {
  return (
    <ViewShell title="Off the clock" kicker="You found it" accent="#4fd1a5" onBack={onBack}>
      <p className="lead">
        Most people only read the time. You held on long enough to clock out with me, so here is what I do when
        the laptop is closed.
      </p>
      <ul className="hobbies">
        {hobbies.map((hobby) => (
          <li key={hobby.title} className="hobby" data-reveal>
            <span className="hobby-emoji" aria-hidden="true">
              {hobby.emoji}
            </span>
            <h2>{hobby.title}</h2>
            <p>{hobby.text}</p>
          </li>
        ))}
      </ul>
    </ViewShell>
  );
}
