
        // Dynamic Scoped Font Scaling for Classroom Back-Row Visibility
        let currentFontSize = 16; // default content base font size in pixels

        function adjustFontSize(delta) {
            currentFontSize = Math.min(26, Math.max(12, currentFontSize + delta));
            document.documentElement.style.setProperty('--font-base-size', currentFontSize + 'px');
            document.getElementById('fontSizeLabel').innerText = currentFontSize + 'px';
        }

        function resetFontSize() {
            currentFontSize = 16;
            document.documentElement.style.setProperty('--font-base-size', '16px');
            document.getElementById('fontSizeLabel').innerText = '16px';
        }

        // Unlock Student Assessment with Access Code: access1234
        function unlockStudentAssessment() {
            const inputCode = document.getElementById('studentAccessCode').value;
            if (inputCode === 'access1234') {
                document.getElementById('studentAuthGate').style.display = 'none';
                document.getElementById('studentQuizContainer').style.display = 'block';
                alert('Assessment Unlocked successfully!');
            } else {
                alert('Invalid Student Access Code! Please try again.');
            }
        }

        // Modal Controls for Header Support / Donation Popup
        function openDonationModal() {
            document.getElementById('donationModalOverlay').style.display = 'flex';
        }

        function closeDonationModal() {
            document.getElementById('donationModalOverlay').style.display = 'none';
        }

        function closeDonationModalOnBackdrop(event) {
            if (event.target.id === 'donationModalOverlay') {
                closeDonationModal();
            }
        }

        // 1. Theme Management, Sidebar Toggles & Mobile Navigation
        function changeTheme(themeName) {
            document.documentElement.setAttribute('data-theme', themeName);
        }

        function toggleDesktopSidebar() {
            const container = document.getElementById('appContainer');
            const btn = document.getElementById('collapseBtn');
            container.classList.toggle('sidebar-collapsed');
            
            if (container.classList.contains('sidebar-collapsed')) {
                btn.innerHTML = '<span>📁</span> Show Sidebar';
            } else {
                btn.innerHTML = '<span>📂</span> Hide Sidebar';
            }
        }

        function toggleSidebarMobile() {
            document.getElementById('sidebar').classList.toggle('open');
        }

        function closeSidebarMobile() {
            if (window.innerWidth <= 900) {
                document.getElementById('sidebar').classList.remove('open');
            }
        }

        // 2. Reading Progress Indicator & ScrollSpy
        window.onscroll = function() {
            updateProgressBar();
            highlightActiveNav();
        };

        function updateProgressBar() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById("progress-bar").style.width = scrolled + "%";
        }

        function highlightActiveNav() {
            const sections = document.querySelectorAll('.section-card');
            const navLinks = document.querySelectorAll('.sidebar-menu a');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // 3. Search Term Highlighting
        function highlightSearch() {
            const query = document.getElementById('searchInput').value.trim().toLowerCase();
            const paragraphs = document.querySelectorAll('.content-area p, .content-area td');
            
            paragraphs.forEach(p => {
                if (!query) {
                    p.style.backgroundColor = '';
                    return;
                }
                const text = p.innerText;
                if (text.toLowerCase().includes(query)) {
                    p.style.backgroundColor = 'rgba(255, 224, 130, 0.4)';
                } else {
                    p.style.backgroundColor = '';
                }
            });
        }

        // 4. Drag & Drop + Touch/Click Selection Fallback Logic
        let selectedTouchTerm = null;

        const dragItems = document.querySelectorAll('.drag-item');
        const dropTargets = document.querySelectorAll('.drop-target');

        dragItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.id);
            });
        });

        function selectTermTouch(elem) {
            dragItems.forEach(i => i.classList.remove('selected'));
            selectedTouchTerm = elem;
            elem.classList.add('selected');
        }

        function dropTermTouch(target) {
            if (selectedTouchTerm) {
                const matchId = target.getAttribute('data-match');
                if (selectedTouchTerm.id === matchId) {
                    target.querySelector('.target-slot').appendChild(selectedTouchTerm);
                    target.style.borderColor = 'var(--secondary)';
                    selectedTouchTerm.classList.remove('selected');
                    selectedTouchTerm = null;
                } else {
                    alert('Incorrect match! Try again.');
                }
            }
        }

        dropTargets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault();
                target.classList.add('hovered');
            });

            target.addEventListener('dragleave', () => {
                target.classList.remove('hovered');
            });

            target.addEventListener('drop', (e) => {
                e.preventDefault();
                target.classList.remove('hovered');
                const id = e.dataTransfer.getData('text/plain');
                const draggedElem = document.getElementById(id);
                
                if (target.getAttribute('data-match') === id) {
                    target.querySelector('.target-slot').appendChild(draggedElem);
                    target.style.borderColor = 'var(--secondary)';
                } else {
                    alert('Incorrect match! Try again.');
                }
            });
        });

        function resetActivity() {
            const bank = document.getElementById('dragBank');
            dragItems.forEach(item => {
                item.classList.remove('selected');
                bank.appendChild(item);
            });
            dropTargets.forEach(target => target.style.borderColor = 'var(--border-color)');
            selectedTouchTerm = null;
        }

        // 5. Protected Teacher Key & Setup Guide Access Control
        function unlockTeacherKey() {
            const pass = document.getElementById('passcode').value;
            const keyBox = document.getElementById('teacherKeyContent');
            const guideBox = document.getElementById('gasGuideContent');
            const headerSheetBtn = document.getElementById('headerAssessmentSheetBtn');

            if (pass === 'P@55w0rd') {
                keyBox.style.display = 'none';
                guideBox.style.display = 'block';
                if (headerSheetBtn) headerSheetBtn.style.display = 'inline-flex'; // Unhide header assessment sheet button
                alert('Access Granted! Unlocked Google Apps Script Setup Guide & Integration Rules.');
            } else if (pass === 'GAS@2026') {
                keyBox.style.display = 'block';
                guideBox.style.display = 'none';
                if (headerSheetBtn) headerSheetBtn.style.display = 'inline-flex'; // Unhide header assessment sheet button
                alert('Access Granted! Unlocked Full Integration Access (Answer Key & Setup Guide).');
            } else {
                alert('Invalid Access Passkey!');
            }
        }

        // 6. Assessment Question Randomization
        // Shuffle the complete question cards every time the HTML page is opened or reloaded.
        // The question text, answer options, radio input names (q1-q15), and correct-answer
        // mapping remain together, so randomizing the display order does not change grading.
        function shuffleAssessmentQuestions() {
            const assessmentForm = document.getElementById('assessmentForm');
            if (!assessmentForm) {
                return;
            }

            const submitButton = assessmentForm.querySelector('button[type="submit"]');
            const questionCards = Array.from(assessmentForm.querySelectorAll('.quiz-card'));

            if (!submitButton || questionCards.length < 2) {
                return;
            }

            // Fisher-Yates shuffle: produces a randomized order without duplicating or losing cards.
            for (let i = questionCards.length - 1; i > 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                [questionCards[i], questionCards[randomIndex]] = [questionCards[randomIndex], questionCards[i]];
            }

            // Move the existing cards in their shuffled order; do not recreate or alter their inputs.
            questionCards.forEach((card, index) => {
                const questionHeading = card.querySelector('.quiz-question');
                if (questionHeading) {
                    // Update only the visible sequence number; preserve the complete question wording.
                    questionHeading.textContent = questionHeading.textContent.replace(/^\s*\d+\.\s*/, '');
                    questionHeading.textContent = (index + 1) + '. ' + questionHeading.textContent;
                }
                assessmentForm.insertBefore(card, submitButton);
            });
        }

        // Run once as the page loads. A fresh random order is generated on every open or reload.
        shuffleAssessmentQuestions();

        /* ==========================================================================
           7. DEDICATED GOOGLE APPS SCRIPT WEB APP ENDPOINTS
           ========================================================================== */
        // 1) DEDICATED WEB APP URL FOR STUDENT ASSESSMENTS
        const assessmentWebAppUrl = "https://script.google.com/macros/s/AKfycbzX6OA-BPrw_Xcl-EvRtNO85oNqEQgqET4kGjVYKxkzj4IOVcBJ54f0vZgwUn7e9_nsWw/exec";

        // 2) DEDICATED WEB APP URL FOR WEBSITE DONATIONS
        const donationWebAppUrl = "https://script.google.com/macros/s/AKfycbxNtFtWctuXBa6KVdQe2zu1Y2SOOE60M96AxFFYSeiHOfmSuYBG7iqAY0PyYCsIq1hFlA/exec";

        // Assessment Form Submission & Google Sheets Synchronization
        function submitAssessment(event) {
            event.preventDefault();
            
            const name = document.getElementById('studentName').value;
            const grade = document.getElementById('gradeLevel').value;
            const section = document.getElementById('studentSection').value;
            
            let score = 0;
            if (document.querySelector('input[name="q1"]:checked')?.value === 'B') score += 1;
            if (document.querySelector('input[name="q2"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q3"]:checked')?.value === 'A') score += 1;
            if (document.querySelector('input[name="q4"]:checked')?.value === 'B') score += 1;
            if (document.querySelector('input[name="q5"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q6"]:checked')?.value === 'A') score += 1;
            if (document.querySelector('input[name="q7"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q8"]:checked')?.value === 'B') score += 1;
            if (document.querySelector('input[name="q9"]:checked')?.value === 'B') score += 1;
            if (document.querySelector('input[name="q10"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q11"]:checked')?.value === 'A') score += 1;
            if (document.querySelector('input[name="q12"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q13"]:checked')?.value === 'B') score += 1;
            if (document.querySelector('input[name="q14"]:checked')?.value === 'C') score += 1;
            if (document.querySelector('input[name="q15"]:checked')?.value === 'A') score += 1;

            alert(`Assessment Submitted!\n\nName: ${name}\nGrade Level: ${grade}\nSection: ${section}\nScore: ${score} / 15`);

            if (assessmentWebAppUrl && assessmentWebAppUrl !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
                const formData = new URLSearchParams();
                formData.append('fullName', name);
                formData.append('gradeLevel', grade);
                formData.append('section', section);
                formData.append('score', score + ' / 15');
                formData.append('timestamp', new Date().toLocaleString());

                fetch(assessmentWebAppUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                }).then(() => {
                    alert('Assessment results synchronized successfully to the Student Assessment Google Sheet!');
                }).catch(err => {
                    console.error('Error synchronizing assessment:', err);
                });
            }
        }

        /* ==========================================================================
           8. DEDICATED DONATION INTEGRATION SCRIPT & DEVELOPER GUIDE
           ==========================================================================
           DEVELOPER & ADMINISTRATOR INSTRUCTIONS FOR DONATIONS:
           
           To receive donor details in a separate, dedicated Google Sheet:
           
           Step A (Dedicated Apps Script for Donations):
           --------------------------------------------------------------------------
           Create a separate Apps Script attached to your dedicated Donors Google Sheet:
           
           function doPost(e) {
             var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
             var p = e.parameter;
             sheet.appendRow([
               p.timestamp || new Date().toLocaleString(),
               p.donorName || 'Anonymous',
               '₱' + (p.amount || '0')
             ]);
             return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
               .setMimeType(ContentService.MimeType.JSON);
           }

           Step B (Frontend Execution):
           --------------------------------------------------------------------------
           The `submitHeaderDonation(event)` function posts parameters asynchronously
           to `donationWebAppUrl` using fetch() with mode: 'no-cors'.
           ========================================================================== */

        // Header Donation Form Submission Logic (Inside Popup Screen)
        function submitHeaderDonation(event) {
            event.preventDefault();

            const name = document.getElementById('donorName').value;
            const amount = document.getElementById('donorAmount').value;

            alert(`Thank you for supporting our website!\n\nDonor: ${name}\nAmount: ₱${amount}\n\nPlease transfer your pledge to our GCash account: 0968-704-2059`);

            if (donationWebAppUrl && donationWebAppUrl !== "YOUR_DEDICATED_DONATION_WEB_APP_URL") {
                const formData = new URLSearchParams();
                formData.append('donorName', name);
                formData.append('amount', amount);
                formData.append('timestamp', new Date().toLocaleString());

                fetch(donationWebAppUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                }).then(() => {
                    alert('Donation log sent successfully to the Dedicated Donor Google Sheet!');
                    document.getElementById('headerDonationForm').reset();
                    closeDonationModal();
                }).catch(err => {
                    console.error('Error sending donation log:', err);
                });
            } else {
                // Graceful fallback when web app URL is not yet configured
                document.getElementById('headerDonationForm').reset();
                closeDonationModal();
            }
        }
