import assert from "node:assert/strict";
import { contactDraft } from "../src/lib/contact-draft.ts";

// User text must stay inside the body, including mail header-like input.
const draft = contactDraft(
  "help@virujhealth.com",
  "Provider demo",
  " Asha ",
  " asha@example.com ",
  "Help with A&B?\n&bcc=other@example.com #test",
);
const query = new URLSearchParams(draft.href.split("?")[1]);
assert.deepEqual([...query.keys()], ["subject", "body"]);
assert.equal(query.get("subject"), "Viruj provider demo");
assert.ok(query.get("body").includes("A&B?\n&bcc=other@example.com #test"));
assert.ok(
  query.get("body").includes("Name: Asha\nReply email: asha@example.com"),
);
assert.equal(draft.text, `${query.get("subject")}\n\n${query.get("body")}`);
console.log(
  "Contact draft: encoding, whitespace, recipient and copy content passed.",
);
