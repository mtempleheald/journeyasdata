<script>
    let dismissed;
    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function dismiss() {
        dismissed = "dismissed"
    }
</script>

<div class="modal-overlay {dismissed}">
    <div class="display {active}" on:mouseenter={enter} on:mouseleave={leave} >
        <p><slot name="pre"></slot></p>
        <p><slot name="main"></slot></p>
        <p><slot name="post"></slot></p>
        <button type="button" on:click={dismiss}>dismiss</button>
    </div>    
</div>

<style>
    .display {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(calc(var(--page-width)*2/3), 100vw);/* fill smaller screens, 2/3 of desktop preferred size */
        padding: 0.5rem 1rem;
        background-color: var(--input-bg, white);
        color: var(--input-txt, black);
        border: var(--input-border, 1px solid black);
    }
    .display.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
    .display.invalid {
        background-color: var(--input-error-bg, pink);
        color: var(--input-error-txt, red);
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: rgba(0,0,0,0.5);/* opacity screws things up, should we always use RGBA?  Need consistency in theme */
    }
    .dismissed {
        display: none;
    }
</style>
