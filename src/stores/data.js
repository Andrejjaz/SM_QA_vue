import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

import { db } from '@/firebase'
import { doc, collection, addDoc, getDocs, setDoc } from "firebase/firestore";

import { read, utils } from 'xlsx'

export const useDataStore = defineStore('data', () => {
  // CONSTANTS
  const data = reactive({});
  const dataBase = reactive([]);
  const employees = reactive([]);
  const currentEmployee = reactive({});
  const currentAnswers = reactive([]);
  const currentDate = ref('');

  // ACTIONS
  const addAdminComment = (shiftNumber, tweetNumber, payload) => {
    const { adminComment, adminMistake, adminFormat } = payload;
    currentAnswers[shiftNumber].answers[tweetNumber].adminComment = {
      adminComment,
      adminMistake,
      adminFormat
    };
  }

  const addData = async (payload) => {
    console.log(payload);
    await addDoc(collection(db, "sm-qa"), payload);
  }

  const ExcelToJSON = function (e, variant) {
    const file = e.target.files[0];

    let reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      let workbook = read(e.target.result, {
        type: 'binary',
        cellDates: true,
        cellNF: false,
        cellText: false
      });

      const options = {
        raw: false,
        dateNF:"yyyy-mm-dd hh:mm:ss"
      };

      workbook.SheetNames.forEach(function (sheetName) {
        let XL_row_object = utils.sheet_to_json(workbook.Sheets[sheetName], options);

        if (variant === 'schedule') {
          const tempArr = XL_row_object.filter((obj) => {
            if (obj.Position === 'Social Media Support Expert (secondary)') {
              employees.push({
                name: obj.Name
              });
              return true;
            }
          })

          const tempScheduleArr = tempArr.map((obj) => {
            const picked = (({ Position, Name, Email, "Org Unit": orgUnit, ...rest }) => ({ Position, Name, ...rest }))(obj);
            return picked;
          })

          data.scheduleObj = tempScheduleArr;
        } else if (variant === 'answers') {
          const tempArr = XL_row_object.map((obj) => {
            const picked = (({
              "Reply Status": replyStatus,
              "Task Assignee": taskAssignee,
              "Replied By": repliedBy,
              "Task Status": taskStatus,
              "First Reply Timestamp": firstReplyTimestamp,
              "Completed Timestamp": completedTimestamp,
              "Connected Profile": connectedProfile,
              "Native Permalink": nativePermalink,
              "Message": message,
              "Permalink": permalink,
              "Timestamp (EET)": timeEET,
              "Timestamp (CAT)": timeCAT,
              "Timestamp (EAT)": timeEAT,
              "Timestamp (PT)": timePT,
              ...rest
            }) => ({
              replyStatus: replyStatus || "",
              taskAssignee: taskAssignee || "",
              repliedBy: repliedBy || "",
              taskStatus: taskStatus || "",
              firstReplyTimestamp: firstReplyTimestamp || "",
              completedTimestamp: completedTimestamp || "",
              connectedProfile: connectedProfile || "",
              nativePermalink: nativePermalink || "",
              message: message || "",
              permalink: permalink || "",
              timeEET: timeEET || "",
              timeCAT: timeCAT || "",
              timeEAT: timeEAT || "",
              timePT: timePT || "",
            }))(obj);
            return picked;
          })

          const repliedOnly = tempArr.filter((obj) => {
            return (
              obj.replyStatus === 'Yes'
            )
          })

          const filtered = repliedOnly.filter((obj) => {
            if (obj.taskAssignee === 'Den Kislinskiy') {
              return false
            }

            if (obj.repliedBy === 'Den Kislinskiy') {
              return false
            }

            return true
          })

          data.answersObj = filtered
        }
      })
    }

    reader.onerror = function (ex) {
      console.log(ex)
    }
  };

  const fetchDB = async () => {
    dataBase.length = 0;

    const querySnapshot = await getDocs(collection(db, "sm-qa"));
    querySnapshot.forEach((doc) => {
      dataBase.push({ id: doc.id, ...doc.data() });
    });
  }

  const getCurrentEmployee = computed(() => {
    return currentEmployee
  })

  const getCurrentAnswers = computed(() => {
    return currentAnswers
  })

  const setCurrentEmployee = (employee) => {
    const regex = /\d/;

    const employeeWorkingDates = [...Object.keys(employee)].filter((item) => {
      if (
          item !== 'Name' &&
          item !== 'Position'
      ) {
          return (
            employee[item].match(regex)
          );
        }
    });

    currentEmployee.name = employee.Name;

    const employeeSchedule = employeeWorkingDates.map((item) => {
      return {
          employeeName: currentEmployee.name,
          shiftDate: item.split(' ')[0],
          shiftTime: employee[item]
      }
    });

    currentEmployee.value = employeeSchedule;

    setCurrentEmployeeAnswers(employeeSchedule);
  }

  const setCurrentEmployeeAnswers = (employeeShifts) => {
    var regExp = /[a-zA-Z]/g;

    currentAnswers.length = 0

    employeeShifts.forEach((item) => {
      const incomingTimeArray = item.shiftTime?.split(' ');
      const regex = /\d/;
      const timeFilteredArray = incomingTimeArray.filter((item) => {
        return item.match(regex);
      })

      const timeMin = timeFilteredArray[0]?.split(':')[0];
      const timeMax = timeFilteredArray[1]?.split(':')[0] === '00' ? '24' : timeFilteredArray[1]?.split(':')[0];

      const scheduleDate = new Date(item.shiftDate).toLocaleDateString();

      let oneShiftAnswers = data.answersObj?.filter((elem) => {
        let completed;

        if (elem.taskStatus === 'Tasked') {
            completed = elem.firstReplyTimestamp;
        } else {
            completed = elem.completedTimestamp;
        }

        if (!completed || regExp.test(completed)) {
            return false;
        }

        const completedArray = completed?.split(' ');

        const date = new Date(completedArray[0]).toLocaleDateString();
        const time = Number(completedArray[1]?.split(':')[0]);

        if (date && time) {
          if (scheduleDate === date && time >= timeMin && time <= timeMax) {
            return elem;
          }
        }
      });

      currentAnswers.push({
        date: item,
        answers: oneShiftAnswers
      });
    });
  }

  const setData = (dataFromDB) => {
    data.scheduleObj = dataFromDB.scheduleObj;
    data.answersObj = dataFromDB.answersObj;
  }

  const setDate = (newDate) => {
    currentDate.value = newDate;
  }

  const updateData = async (id, payload) => {
    await setDoc(doc(db, "sm-qa", id), payload);
  }

  return {
    // CONSTANTS
    data,
    dataBase,
    employees,
    currentEmployee,
    currentAnswers,
    currentDate,

    // ACTIONS
    addAdminComment,
    addData,
    ExcelToJSON,
    fetchDB,
    getCurrentEmployee,
    getCurrentAnswers,
    setCurrentEmployee,
    setCurrentEmployeeAnswers,
    setData,
    setDate,
    updateData,
  }
})