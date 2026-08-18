import { HeroBanner, Input } from '@fly/ui';

import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.page}>
      <HeroBanner
        title="Welcome to Fly"
        subtitle="Build and deploy your applications with ease."
        ctaLabel="Get Started"
        ctaHref="/get-started"
      />

      <Input id="username" label="Username" placeholder="Enter your username" />
    </div>
  );
}
