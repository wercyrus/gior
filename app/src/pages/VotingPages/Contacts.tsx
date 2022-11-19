import {
  addContacts,
  changedNumbers,
  selectPhoneNumbers,
} from "../../store/newProfile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ContactsPicker, IContact } from "./components/ContactsPicker";
import { NumberList } from "./components/NumberList";

export function Contacts() {
  const dispatch = useAppDispatch();
  const numbers = useAppSelector(selectPhoneNumbers);

  function changedContactPicker(contacts: IContact[]) {
    dispatch(addContacts(contacts));
  }
  function changedNumbersList(numbers: string[]) {
    dispatch(changedNumbers(numbers));
  }

  return (
    <>
      <NumberList listNumbers={numbers} onChange={changedNumbersList} />
      <ContactsPicker onChange={changedContactPicker} />
    </>
  );
}
