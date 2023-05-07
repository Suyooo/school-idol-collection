interface DroppableEvent {
    detail: {draggable: {element: HTMLElement}, droppable: HTMLElement, sensorEvent: {data: {pageX: number, pageY: number}}}
}

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        'ondroppable:drop'?: (event: Event & DroppableEvent) => void;
    }
}