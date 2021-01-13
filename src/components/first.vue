<template>
    <div>
        <ul>            
            <TodoItem 
                v-for="item in TODO_list" 
                v-bind:item="item"
            />

        </ul>
    </div>
</template>

<script>
import TodoItem from '@/components/second';

export default {
    props: ['TODO_list'],
    components: {
        TodoItem
    }
}

</script>

<style scoped>
    ul {
        list-style: none;
        
    }
</style>