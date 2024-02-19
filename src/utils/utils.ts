export function privateChatGenerator(sender: string, receiver: string) {
  return [sender, receiver].sort().join('')
}
