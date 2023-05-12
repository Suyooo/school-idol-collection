interface DroppableEvent {
    detail: { draggable: { element: HTMLElement, position: { absolute: { left: number, top: number; }; }; }, droppable: HTMLElement, sensorEvent: { data: { pageX: number, pageY: number; }; }; };
}

interface DraggableEvent {
    detail: { helper: HTMLElement, droppable?: { element: HTMLElement; }; };
}

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        'ondrag:stop'?: (event: Event & DraggableEvent) => void;
        'ondroppable:drop'?: (event: Event & DroppableEvent) => void;
    }
}