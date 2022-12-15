function handleSmoothScrolling(ev: React.MouseEvent, targetId: string) {
    ev.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) {
        return;
    }
    target.scrollIntoView({
        behavior: "smooth",
    });
}

export default handleSmoothScrolling;