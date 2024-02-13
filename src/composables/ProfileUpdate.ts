import { ref } from 'vue'
import { useUser } from '@/store/User'
export function useProfileUpdate() {
  const userStore = useUser()
  const newFullName = ref<string>()
  const newAvatar = ref()
  const previewAvatar = ref(userStore.user!.avatar)

  const onUpdateFullName = (fullName: string) => {
    newFullName.value = fullName
  }

  const onUpdateAvatar = (file: any) => {
    previewAvatar.value = URL.createObjectURL(file)
    newAvatar.value = file
  }

  const onUpdate = async () => {
    const formData = new FormData()
    formData.set('avatar', newAvatar.value)
    formData.set('fullName', newFullName.value ? newFullName.value : '')
    await userStore.updateUser(formData)
    newFullName.value = undefined
    newAvatar.value = undefined
  }

  return {
    onUpdateFullName,
    onUpdateAvatar,
    onUpdate,
    newFullName,
    newAvatar,
    previewAvatar
  }
}
