<template>
    <li>
         
        <span>
        <strong>{{ item.id }}</strong>        
        {{ item.title }}
        </span>
        
        
        
        
    </li>    
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>