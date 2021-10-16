<script>
    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
</script>


<div class="display {active}" on:mouseenter={enter} on:mouseleave={leave} >
    <p><slot name="pre"></slot></p>
    <p><slot name="main"></slot></p>
    <p><slot name="post"></slot></p>
</div>
  

<style>
    .display {
        margin: 0;
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
</style>
