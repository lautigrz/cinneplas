import { useRef } from "react";

function useDragScroll() {
    const carouselRef = useRef(null);

    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isDragging = useRef(false);

    const handleMouseDown = (e) => {
        isDragging.current = true;

        startX.current =
            e.pageX - carouselRef.current.offsetLeft;

        scrollLeft.current =
            carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;

        e.preventDefault();

        const x =
            e.pageX - carouselRef.current.offsetLeft;

        const distance =
            (x - startX.current) * 1.5;

        carouselRef.current.scrollLeft =
            scrollLeft.current - distance;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    return {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
    };
}

export default useDragScroll;