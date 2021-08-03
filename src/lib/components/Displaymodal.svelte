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
    <div class="question {active}" on:mouseenter={enter} on:mouseleave={leave} >
        <p><slot name="pre"></slot></p>
        <p><slot name="main"></slot></p>
        <p><slot name="post"></slot></p>
    </div>
    <button type="button" on:click={dismiss}>dismiss</button>
</div>

<style>
    .question {
        margin: 0.5rem 1rem;
        padding: 0.5rem 1rem;
        background-color: var(--input-bg, white);
        color: var(--input-txt, black);
        border: var(--input-border, 1px solid black);
    }
    .question.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
    .question.invalid {
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
    }
    .dismissed {
        display: none;
    }
</style>