import type { Message } from '$lib/message_box_model';
import { writable, type Writable } from 'svelte/store';

export const group_message_map: Writable<Map<number, Message[]>> = writable();
export const private_message_map: Writable<Map<number, Message[]>> = writable();