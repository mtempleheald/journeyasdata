<script>
    export let title;
    export let logo;
</script>
    
<section>
    <img src={logo} alt="logo">
    <span>{title}</span>
    <slot></slot>
</section>

<style>
    section {
        border: 1px solid black;
    }
    img {
        float: left;
    }
    span {
        height: 50px;
        line-height: 50px;
        float: none;
    }
</style>