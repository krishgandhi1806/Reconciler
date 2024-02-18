# Reconciler

Reconciliation is the concept of comparing the changes made in the virtual dom with the real dom and then implementing those changes in the real dom.
Pretty much exactly how the React works.
This is a manual implemntation of that reconciler.

It follows the following flow:
1. It saves the state of the existing dom
2. Then create a new vDOM with the changes
3. Then traverse the current dom and find if any element already exists or not
   If it exists, then update those elements
4. If it doesn't exist, then create the new element and append it to the parentElement
5. Now, any item in the existing DOM no longer exists in the actual data, so remove them
