// Cache object
export const Cache = {
    tasks: null,
    load: function () {
        if (this.tasks === null) {
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        }
        return this.tasks;
    },
    save: function (tasks) {
        this.tasks = tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}; // end of Cache object

