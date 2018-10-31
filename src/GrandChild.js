import React, { forwardRef, useEffect } from "react";
export default forwardRef((props, ref) => {
  useEffect(() => {
    console.log("Grandchild rendered");
  });

  const handleKeyPress = event => {
    event.persist();
    console.log(event);
  };

  const handleKeydown = event => {
    event.persist();
    const text = event.currentTarget.value;
    const selectionText = "santhanam";
    if (
      event.which === 9 &&
      text &&
      text.length >= selectionText.length &&
      text.toLowerCase().indexOf(selectionText) > -1
    ) {
      event.preventDefault();
      const start = text.toLowerCase().indexOf(selectionText);
      const end =
        start + selectionText.length <= text.length
          ? start + selectionText.length
          : text.length;
      event.currentTarget.setSelectionRange(start, end);
    }
  };

  return (
    <div>
      GrandChild
      <input
        onKeyDown={event => handleKeydown(event)}
        onKeyPress={event => handleKeyPress(event)}
        defaultValue="Dinakaran Santhanam"
        type="text"
        ref={ref}
      />
    </div>
  );
});
