import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'World of Sea Battle — Tools & Calculators',
  description: 'Unofficial tools and calculators for World of Sea Battle.',
};

const tools = [
  {
    href: '/games/world-of-sea-battle/calculator',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    description:
      'Configure your broadside loadout and calculate live damage output. Select your ship, target, ammo, crew, attachments, and cosmetics to see your full artillery projection.',
    tags: ['Combat', 'Artillery', 'Loadout'],
  },
];

export default function WorldOfSeaBattlePage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.anchorRow}>
          <span className={styles.anchor}>⚓</span>
          <h1 className={styles.title}>World of Sea Battle</h1>
          <span className={styles.anchor}>⚓</span>
        </div>
        <p className={styles.subtitle}>Unofficial Tools &amp; Calculators</p>
        <div className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className={styles.card}>
            <div className={styles.cardIcon}>{tool.icon}</div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{tool.title}</div>
              <p className={styles.cardDesc}>{tool.description}</p>
              <div className={styles.tagRow}>
                {tool.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.cardArrow}>→</div>
          </Link>
        ))}
      </div>

      <footer className={styles.footer}>
        World of Sea Battle — Unofficial Fan Tools · Not affiliated with the developers
      </footer>
    </main>
  );
}
