import { useRef } from "react";

function useDragScroll() {
    const carouselRef = useRef(null);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isDragging = useRef(false);

    const handleMouseDown = (e) => {
        if (!carouselRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current || !carouselRef.current) return;
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    const handleWheel = (e) => {
        if (!carouselRef.current) return;
        if (e.deltaY !== 0) {
            carouselRef.current.scrollLeft += e.deltaY;
        }
    };

    return {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
        handleWheel,
    };
}

export default useDragScroll;