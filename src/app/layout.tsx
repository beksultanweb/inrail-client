'use client'

import '../assets/scss/main.scss'

import Header from '../components/Header';
import Footer from '../components/Footer';

import AuthStore from '../store/AuthStore';

import { Provider } from 'mobx-react';


export default function RootLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ru">
        <body>
          <Provider authStore={AuthStore}>
            <Header />
              {children}
            <Footer />
          </Provider>
        </body>
      </html>
    )
  }