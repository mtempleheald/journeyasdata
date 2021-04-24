<script>
    export let title;
    export let logo;
</script>
    

<section>
    <header>
        <img src={logo} alt="logo">
        <h3>{title}</h3>
    </header>
    <slot></slot>
</section>


<style>
    section {
        border: 1px solid black;
        margin: 1rem;
        padding: 0.5rem;
    }
    header {
        display: flex;
        flex-direction: row;
    }
    img {
        height: 50px;
        width: 100px;
    }
    h3 {
        height: 50px;
        line-height: 50px;
        width: calc(100vw - 100px);
        margin: 0;
        padding: 0 1rem;
    }
</style>