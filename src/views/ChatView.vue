<script setup lang="ts">
import { ref } from 'vue'
import ChatInput from '@/components/ChatInput.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatProfile from '@/components/ChatProfile.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import { useMessages } from '@/composables/useMessages'
import socket from '@/listeners/socket'
import type { User } from '@/interfaces/user';
const { messages, isLoading, error } = useMessages()
const connectedUsers = ref<User[]>([])

socket.on("new-message", (data) => {
  messages.value.push(data)
});
socket.on("my-new-message", (data) => {
  messages.value.push(data)
});
socket.on('user-join', (data) => {
  connectedUsers.value = data
})
socket.on('user-leave', (data) => {
  connectedUsers.value = data
})
const sendMessage = (message: string) => {
  socket.emit('send-message', message)
}

</script>

<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="people-list mt-2 p-3">
            <ChatInput size="xl" icon="magnifying-glass" placeholder="Search ...." />
            <ul class="chat-list mt-4 mb-0">
              <ChatProfile v-for="user in connectedUsers" :key="user._id"
                :img="'https://bootdey.com/img/Content/avatar/avatar1.png'" :name="user.fullName" :status="'connected'" />

            </ul>
          </div>
          <div class="chat">
            <ChatHeader :chatName="'First chat'" :created="'10/10/2024'" />
            <div v-if="isLoading"> LOADING</div>
            <div v-else-if="error">
              ERROR
            </div>
            <div v-else class="chat-history p-3">
              <ul>
                <ChatMessage v-for="message in messages" :key="message._id" :isMyMessage="message.isMyMessage"
                  :time="message.date.toString()" :img="'https://bootdey.com/img/Content/avatar/avatar7.png'"
                  :message="message.content" :fullName="message.isMyMessage ? 'You' : message.sender.fullName" />
              </ul>
            </div>
            <div class="chat-message mb-1 p-1">
              <ChatInput size="xl" icon="paper-plane" placeholder="Enter text here..." @send-message="sendMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 50%);
}

.people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
}

.chat {
  margin-left: 280px;
}

@media only screen and (max-width: 767px) {
  .people-list {
    display: none;
  }

  .chat {
    margin-left: 0
  }

  .chat-history {
    height: 300px;
    overflow-x: auto
  }
}

@media only screen and (min-width: 768px) {

  .chat-history,
  .chat-list {
    height: 600px;
    overflow-x: auto;
  }

  .chat {
    border-left: 1px solid #eaeaea
  }
}
</style>
