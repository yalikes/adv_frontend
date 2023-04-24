import type { Message } from '$lib/message_box_model';
import { writable, type Writable } from 'svelte/store';

export const message_list: Writable<Message[]> = writable([]);