const recentActivities = document.querySelectorAll(".recent-activity")
if(recentActivities){
    recentActivities.forEach(recentActivity => {
        recentActivity.addEventListener("click", () => {
            const timeActive = document.querySelector("#time-active")
            timeActive.innerHTML = recentActivity.value
        })
    })
}