//function use to format the date for the server query; to know wether or not
//today picture is upload to our database
export const getFormat = () => {

    const date = new Date();
    const month = () =>{
        if(date.getMonth()>8) return (date.getMonth()+1)
        else
            switch (date.getMonth()){
                case 0:
                    return "01"
                case 1:
                    return "02"
                case 2:
                    return "03"
                case 3:
                    return "04"
                case 4:
                    return "05"
                case 5:
                    return "06"
                case 6:
                    return "07"
                case 7:
                    return "08"
                case 8:
                    return "09"
            }
    }
    return `${date.getFullYear()}-${month()}-${date.getDate()}`
}