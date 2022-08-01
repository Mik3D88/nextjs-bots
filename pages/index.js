import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
        <div className={styles.container}>
          <h1 className={styles.titulo}>Mike Automation RPA Site </h1>
          <button className={styles.button}>Iniciar automação de busca de conteudos</button>
          <h3 className={styles.titulo}>Plataforma de serviços custmizados de mineração de dados </h3>
        </div>
    </>
  )

}
