<script>
    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
</script>


<div class="question {active}" on:mouseenter={enter} on:mouseleave={leave} >
    <p><slot name="pre"></slot></p>
    <p><slot name="main"></slot></p>
    <p><slot name="post"></slot></p>
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
</style>
