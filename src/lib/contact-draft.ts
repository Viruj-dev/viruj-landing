export function contactDraft(
  recipient: string,
  kind: string,
  name: string,
  email: string,
  message: string,
) {
  const subject = `Viruj ${kind.toLowerCase()}`;
  const body = `Hi Viruj,\n\n${message.trim()}\n\nName: ${name.trim()}\nReply email: ${email.trim()}\nInterested in: ${kind}`;
  return {
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `${subject}\n\n${body}`,
  };
}
