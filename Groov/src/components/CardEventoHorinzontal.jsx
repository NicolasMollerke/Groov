import React, { useRef, useState, useEffect } from 'react'
import { Link } from "react-router"

export default function CardEventoHorinzontal({ evento }) {
    const listaPalavrasChave = []
    if (evento.palavras_chave) {
        for (let i = 0; i < evento.palavras_chave.length; i++) {
            listaPalavrasChave.push(
                <p
                    key={i}
                    className="text-[0.4375rem] text-white py-[0.06rem] px-[0.15rem] bg-roxop rounded-[0.625rem] border-roxos border-2"
                >
                    {evento.palavras_chave[i]}
                </p>
            )
        }
    }

    const titleContainerRef = useRef(null)
    const titleRef = useRef(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        const container = titleContainerRef.current
        const text = titleRef.current
        if (!container || !text) return
        const check = () => {
            setIsOverflowing(text.scrollWidth > container.clientWidth + 1)
            // reset any transform when content changes
            text.style.transform = 'translateX(0)'
            text.style.transition = 'none'
        }
        check()
        // observe resize / font loading
        const ro = new ResizeObserver(check)
        ro.observe(container)
        ro.observe(text)
        return () => ro.disconnect()
    }, [evento.nome])

    const handleMouseEnter = () => {
        const container = titleContainerRef.current
        const text = titleRef.current
        if (!isOverflowing || !container || !text) return
        const distance = text.scrollWidth - container.clientWidth
        const speed = 60 // pixels per second
        const duration = Math.max(distance / speed, 3)
        // use transition to slide text to the left
        requestAnimationFrame(() => {
            text.style.transition = `transform ${duration}s linear`
            text.style.transform = `translateX(-${distance}px)`
        })
    }

    const handleMouseLeave = () => {
        const text = titleRef.current
        if (!text) return
        // smoothly return to start
        text.style.transition = 'transform 0.4s ease'
        text.style.transform = 'translateX(0)'
    }

    return (
        <>
            <div className="w-full flex items-end gap-3">
                <Link to={`/evento/${evento.id}`}>
                    <img className="h-[8.24838rem] w-36" src={evento.imagem} alt="" />
                </Link>

                <div className="flex flex-col justify-start mt-12 flex-1 min-w-0">
                    <div
                        ref={titleContainerRef}
                        className="overflow-hidden"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h3
                            ref={titleRef}
                            className="text-[1rem] text-white font-semibold whitespace-nowrap"
                            style={{ transform: 'translateX(0)' }}
                        >
                            {evento.nome}
                        </h3>
                    </div>

                    <div className="flex gap-[0.2rem] mt-2">{listaPalavrasChave}</div>
                    <div className="flex gap-1 mt-1">
                        <p className="text-[0.5rem] text-white">{`${evento.data},`}</p>
                        <p className="text-[0.5rem] text-white">{`${evento.hora}`}</p>
                    </div>
                </div>
            </div>
        </>
    )
}