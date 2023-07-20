import React from 'react'

import type { ReactNode } from 'react'

import classes from './MainLayount.module.css'

const MainLayout = ({ children }: { children?: ReactNode }): JSX.Element => (
  <main className={classes.commonMain}>
    <header>Artickles List</header>
    <section className={classes.main}>{children}</section>
    <footer>© 2023 Home</footer>
  </main>
)

export default MainLayout
