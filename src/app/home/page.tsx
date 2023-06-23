'use client'

import AdminLayout from "@/component/AdminLayout";
import './style.css'
import Image from 'next/image'

export default function HomePage() {
  return (
    <AdminLayout>
      <div>
        <div style={{
            backgroundColor: 'white',
            color: 'pink', padding: 30
          }}>
          <img src="https://i.pinimg.com/originals/cb/6f/81/cb6f81626f98c16f8392967f56c578cf.png" width="100" align="right"/>
          <center><h1>Clube de Aviação</h1></center>
        </div>
        <hr style={{
          height: 2,
          borderWidth:0,
          color: 'pink',
          backgroundColor: 'pink',
          }}/>
        <div>
          <center>
            <div className="container" >
              <img src="https://pbs.twimg.com/media/BaCOwn9CIAAdfuH.png" width="half" alt="a" className="image" style={{width: '100%'}} />
              <div className="middle">
                <div className="text">
                  <a href="https://oglobo.globo.com/saude/noticia/2023/06/como-manter-a-calma-em-um-voo-turbulento-6-dicas-de-especialistas-em-aviacao.ghtml">
                    <b>Como manter a calma em um voo turbulento? 6 dicas de especialistas em aviação</b>
                  </a>
                </div>
              </div>
            </div>
            <div className="container">
              <img src="https://i.ebayimg.com/images/g/uAIAAOSw6-NkAKvW/s-l400.jpg" width="half" alt="a" className="image" style={{width: '100%'}} />
              <div className="middle">
                <div className="text">
                  <a href="https://aeromagazine.uol.com.br/artigo/o-chile-foi-destaque-no-oscar-da-aviacao.html">
                    <b>O Chile foi destaque no ‘Oscar da Aviação’</b>
                  </a>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </AdminLayout>
  )
}
