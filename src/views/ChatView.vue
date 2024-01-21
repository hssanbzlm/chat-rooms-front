<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatProfile from '@/components/ChatProfile.vue';
import ChatHeader from '@/components/ChatHeader.vue'

</script>

<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="people-list mt-2 p-3">
            <ChatInput size="xl" icon="magnifying-glass" placeholder="Search ...." />
            <ul class="chat-list mt-4 mb-0">
              <ChatProfile :img="'https://bootdey.com/img/Content/avatar/avatar1.png'" :name="'Vincent Porter'"
                :status="'left 7 mins ago'" />
              <ChatProfile :img="'https://bootdey.com/img/Content/avatar/avatar2.png'" :name="'Aiden Chavaz'"
                :status="'online'" />
              <ChatProfile :img="'https://bootdey.com/img/Content/avatar/avatar3.png'" :name="'Mike Thomas'"
                :status="'online'" />

            </ul>
          </div>
          <div class="chat">
            <ChatHeader :chatName="'First chat'" :created="'10/10/2024'" />
            <div class="chat-history p-3">
              <ul>
                <ChatMessage :isMyMessage="false" :time="'10:10 AM, Today'"
                  :img="'https://bootdey.com/img/Content/avatar/avatar7.png'"
                  :message="'Hi Aiden, how are you? How is the project coming along?'" />
                <ChatMessage :isMyMessage="true" :time="'10:12 AM, Today'" :message="'Are we meeting today?'" />
                <ChatMessage :isMyMessage="false" :time="'10:10 AM, Today'"
                  :img="'https://bootdey.com/img/Content/avatar/avatar7.png'"
                  :message="'Hi Aiden, how are you? How is the project coming along?'" />
                <ChatMessage :isMyMessage="true" :time="'10:12 AM, Today'" :message="'Are we meeting today?'" />
                <ChatMessage :isMyMessage="true" :time="'10:12 AM, Today'" :message="'Are we meeting today?'" />
                <ChatMessage :isMyMessage="true" :time="'10:12 AM, Today'" :message="'Are we meeting today?'" />

              </ul>
            </div>
            <div class="chat-message mb-1 p-1">
              <ChatInput size="xl" icon="paper-plane" placeholder="Enter text here..." />
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
